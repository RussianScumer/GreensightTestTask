<?php

namespace App\Http\Controllers;

use App\Http\Actions\UserAction;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function registration(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'lastName' => 'required|string',
                'email' => 'required|email',
                'password' => 'required|string',
                'forconfirmpassword' => 'required|string'
            ]);
        } catch (Exception $e){
            return response()->json(['error' => $e->getMessage()], 400);
        }
        $usersConstArray = UserAction::createUsers();
        try {
            if($validated['password'] != $validated['forconfirmpassword'])
            {
                throw new Exception("Пароли не совпадают");
            }
            foreach ($usersConstArray as $value) {
                if ($value->email == $validated['email']) {
                    throw new Exception("Пользователь с таким email уже существует");
                }
            }
        } catch (Exception $e) {
            Log::alert($e->getMessage());
            return response()->json(['error' => $e->getMessage()], 400);
        }
        Log::info("Успешная регистрация" . " " .$validated['email']);
        return response()->json(['data' => 'Успешная регистрация'], 200);
    }
}
