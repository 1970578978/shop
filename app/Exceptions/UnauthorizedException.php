<?php 
namespace App\Exceptions; 
 
/***
 * API 自定义异常类
 */
use Exception;

class UnauthorizedException extends Exception 
{ 

    // 重定义构造器使 message 变为必须被指定的属性  
    public function __construct($message, $code = 500) {  
        // 自定义的代码  

        // 确保所有变量都被正确赋值  
        parent::__construct($message, $code);  
    }  
    

} 
