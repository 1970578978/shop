<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <link rel="stylesheet" href="{{ asset('css/header/index.css') }}">
</head>
<body>
    <div class="container-fluid header">
        <div class="banner-container flex-center" id="header-banner"> <!-- z-index 1 -->
            <div class="banner-limit">
                <!-- menu -->
                <div class="mains">
                    <div class="search-container flex-center">
                        <div class="search-ico flex-center"><img src="{{ asset('svg/header/mobi-icon-search.svg') }}" width="15" height="15"></div>
                        <input class="md-text-setting" name="mobi-search" id="search_bar" type="input" maxlength="40" placeholder="点击输入你想要的~">
                    </div>
                    <div class="menu-box xs-d-none sm-d-none md-d-flex">
                        <ul class="menu-lists pre-text-stting xs-d-none sm-d-none md-d-flex" id="menu_lists">
                            <li class="flex-center"><a href="#">首页</a></li>
                            <li class="flex-center"><a href="#">新品</a></li>
                            <li class="flex-center"><a href="#">支持</a></li>
                            <!-- <li class="flex-center"><a href="#">关于我们</a></li> -->
                        </ul>
                    </div>
                </div>
                <div class="logo flex-center"><img src="{{ asset('svg/header/mall.svg') }}" alt="logo"></div>
                <!-- right items -->
                <div class="banner-items" style="position: relative">
                    <div class="item flex-center xs-d-none sm-d-none md-d-flex">
                        <i class="search-ico flex-center" id="btn-search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 40 40">
                                <path id="md-search-ico" d="M39.212,35.729l-7.701-7.701 c2.215-2.932,3.545-6.57,3.545-10.528c0-9.665-7.835-17.5-17.5-17.5s-17.5,7.835-17.5,17.5c0,9.664,7.835,17.5,17.5,17.5 c3.902,0,7.494-1.293,10.404-3.452l7.717,7.717c0.863,0.863,2.446,1.09,3.535,0C40.234,38.242,40.262,36.779,39.212,35.729z M17.556,31c-7.456,0-13.5-6.045-13.5-13.5c0-7.456,6.044-13.5,13.5-13.5c7.456,0,13.5,6.044,13.5,13.5 C31.056,24.955,25.012,31,17.556,31z"/>
                            </svg>
                        </i>
                    </div>
                    <div class="md-search-box xs-d-none sm-d-none md-d-block">
                        <div class="md-search-outer">
                            <div class="button-go" id="btn-go">

                            </div>
                            <input class="pre-text-setting" id="md-search" type="text" placeholder="按下回车键搜索" maxlength="40">
                            <div class="search-list" id="search-list">
                                <div class="list">
                                    <div class="feature-content pre-text-setting trans-bc-100" id="test">
                                        <span>这是一串检索结果检索结果检这是一串检索结这是一串检索结果检索结果检这是一串检索结</span>
                                    </div>
                                    <div class="feature-icon"></div>
                                    <div class="toTop trans-bc-100"></div>
                                </div>
                                <div class="list">
                                    <div class="feature-content pre-text-setting trans-bc-100" id="test">
                                        <span>0123</span>
                                    </div>
                                    <div class="feature-icon"></div>
                                    <div class="toTop trans-bc-100"></div>
                                </div>
                                <div class="list">
                                    <div class="feature-content pre-text-setting trans-bc-100" id="test">
                                        <span>789898</span>
                                    </div>
                                    <div class="feature-icon"></div>
                                    <div class="toTop trans-bc-100"></div>
                                </div>
    
                            </div>
                        </div>
                    </div>
                    <div class="item flex-center xs-d-none sm-d-none md-d-flex">
                        <i class="md-ico trans-bc-100" id="my_account">&#xe853;</i>
                    </div>
                    <div class="item flex-center xs-d-none sm-d-none md-d-flex">
                        <i class="md-ico trans-bc-100" id="my_cart">&#xe8cc;</i>
                        <span class="tip flex-center"><i class="md-ico sm_num">&#xe400;</i></span>
                    </div>
                    <div class="item flex-center xs-d-flex sm-d-flex md-d-none">
                        <!-- <i class="md-ico trans-bc-100" id="menu_button">&#xe5d2;</i> -->
                        <span class="tip flex-center"><i class="md-ico sm_num">&#xe400;</i></span>
                        <svg class="ham hamRotate ham4" id="menu_button" viewBox="0 0 100 100" width="55" height="55" onclick="this.classList.toggleClass('active')">
                            <path class="line top" d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"></path>
                            <path class="line middle" d="m 70,50 h -40"></path>
                            <path class="line bottom" d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"></path>
                        </svg>
                    </div>
                </div>
                <!-- hidden -->
                <!--<div class="menu-slide md-shadow md-text-setting" id="cart-list">
                    <div class="menu-item">
                        <div class="things-look flex-center">
                            <i class="md-ico trans-bc-100">&#xe5c3;</i>
                        </div>
                        <div class="things-name flex-center"><nowrap class="md-text-setting text-nowrap">商品商品上商品商品上商品商品上商品商品上商品商品上</nowrap><div class="number flex-center"><span class="md-text-setting">x1</span></div></div>
                    </div>
                    <div class="menu-item">
                        <div class="things-look flex-center">
                            <i class="md-ico trans-bc-100">&#xe5c3;</i>
                        </div>
                        <div class="things-name flex-center text-nowrap"><nowrap class="md-text-setting">商品商品上</nowrap><div class="number flex-center"><span class="md-text-setting">x1</span></div></div>
                    </div>
                    <div class="menu-item">
                        <div class="things-look flex-center">
                            <i class="md-ico trans-bc-100">&#xe5c3;</i>
                        </div>
                        <div class="things-name flex-center text-nowrap"><nowrap class="md-text-setting">商品商品上</nowrap><div class="number flex-center"><span class="md-text-setting">x1</span></div></div>
                    </div>
                    <div class="menu-item">
                        <div class="things-look flex-center">
                            <i class="md-ico trans-bc-100">&#xe5c3;</i>
                        </div>
                        <div class="things-name flex-center text-nowrap"><nowrap class="md-text-setting">商品商品上</nowrap><div class="number flex-center"><span class="md-text-setting">x1</span></div></div>
                    </div>
                    <div class="menu-item">
                        <div class="things-look flex-center">
                            <i class="md-ico trans-bc-100">&#xe5c3;</i>
                        </div>
                        <div class="things-name flex-center text-nowrap"><nowrap class="md-text-setting">商品商品上</nowrap><div class="number flex-center"><span class="md-text-setting">x1</span></div></div>
                    </div>
                    <div class="menu-item">
                        <div class="things-look flex-center">
                            <i class="md-ico trans-bc-100">&#xe5c3;</i>
                        </div>
                        <div class="things-name flex-center text-nowrap"><nowrap class="md-text-setting">商品商品上</nowrap><div class="number flex-center"><span class="md-text-setting">x1</span></div></div>
                    </div>
                    <div class="menu-item">
                        <div class="things-look flex-center">
                            <i class="md-ico trans-bc-100">&#xe5c3;</i>
                        </div>
                        <div class="things-name flex-center text-nowrap"><nowrap class="md-text-setting">商品商品上</nowrap><div class="number flex-center"><span class="md-text-setting">x1</span></div></div>
                    </div> -->
                    <!-- more -->
                    <!--<div class="menu-item flex-center viewAll">
                        <i class="md-ico trans-bc-100" data-change="not_change">&#xe5d3;</i>
                    </div>
                </div> -->
            </div>
        </div>

        @yield('select')
    </div>
    @yield('content')
</body>
<script src="{{ asset('js/header/_global.js') }}" type="text/javascript"></script>
<script src="{{ asset('js/header/index.js') }}" type="text/javascript"></script>
</html>