<?php

namespace App\Http\Actions;

use App\Models\User;

class UserAction
{
    public static function createUsers(){
        $array = array();
        $obj1 = new User();
        $obj1->id = 1;
        $obj1->name = "ThisNameOfFirstUser";
        $obj1->email = "randomemail@mailbox.com";
        $obj2 = new User();
        $obj2->id = 2;
        $obj2->name = "ThisNameOfSecondUser";
        $obj2->email = "randomcoolemail@box.com";
        $array[] = $obj1;
        $array[] = $obj2;
        return $array;
    }
}
