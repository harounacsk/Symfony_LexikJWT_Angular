<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/registration')]

class UserController extends AbstractController
{
    private $passwordHasher;
    private $userRepository;

    public function __construct(UserPasswordHasherInterface $passwordHasher, UserRepository $userRepository)
    {
        $this->passwordHasher = $passwordHasher;
        $this->userRepository = $userRepository;
    }

    #[Route('/user', name: 'app_user', methods: ['POST'])]
    public function index(Request $request): JsonResponse
    {

        $user = new User();
        $data = json_decode($request->getContent());
        $user->setEmail($data->email);
        $user->setPassword($this->passwordHasher->hashPassword($user, $data->password));
        $this->userRepository->save($user, true);

        return $this->json([
            'message' => 'success'
        ]);
    }
    
}
