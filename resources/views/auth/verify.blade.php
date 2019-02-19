@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('确认你的邮箱地址') }}</div>

                <div class="card-body">
                    @if (session('resent'))
                        <div class="alert alert-success" role="alert">
                            {{ __('验证链接已发送到您的电子邮件地址。') }}
                        </div>
                    @endif

                    {{ __('在继续之前，请检查您的电子邮件以获取验证链接。') }}
                    {{ __('如果您没有收到该电子邮件') }}, <a href="{{ route('verification.resend') }}">{{ __('点击这里 重新发送') }}</a>.
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
