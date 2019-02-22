<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIndexCarouselsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('index_carousels', function (Blueprint $table) {
            $table->increments('id');
            $table->string('img_local', 150)->comment('图片链接位置');
            $table->string('img_title', 100)->nullable()->comment('图片标题');
            $table->string('img_url', 150)->comment('图片跳转链接');
            $table->unsignedTinyInteger('sort')->default(1)->comment('排序序号');
            $table->unsignedTinyInteger('is_enable')->default(1)->comment('是否启用');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('index_carousels');
    }
}
