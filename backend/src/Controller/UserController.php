<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

#[Route('/user',name: 'app_user')]
class UserController extends AbstractController
{
    private $passwordHasher;
    private $userRepository;

    public function __construct(UserPasswordHasherInterface $passwordHasher, UserRepository $userRepository)
    {
        $this->passwordHasher = $passwordHasher;
        $this->userRepository = $userRepository;
    }

    #[Route('/register', name: 'app_user', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent());
        if($this->userRepository->findOneBy(['email' => $data->email]) == null){
            $user = new User();
            $user->setEmail($data->email);
            $user->setPassword($this->passwordHasher->hashPassword($user, $data->password));
            $this->userRepository->save($user, true);
            return $this->json([
                'message' => 'success'
            ]);
        }

        return $this->json([
            'message' => 'User already exists'
        ]);
    }

    #[Route('/auth', name: 'auth_user', methods: ['POST'])]
    public function login(Request $request, JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        $data = json_decode($request->getContent());
        $user = $this->userRepository->findOneBy(['email' => $data->email]);
        if ($user != null) {
            if ($this->passwordHasher->isPasswordValid($user, $data->password)) {
                $token = $JWTManager->create($user);
                return $this->json(['token' => $token]);
            }
        }
        throw new AccessDeniedException('Invalid credentials');
    }
}
