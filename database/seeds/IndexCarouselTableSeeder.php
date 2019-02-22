<?php

use Illuminate\Database\Seeder;
use App\Models\IndexPage\IndexCarousel;

class IndexCarouselTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //不适用用于生产大规模数据
        $faker = \Faker\Factory::create('zh_CN');

        for ($i=0;$i<10;$i++){
            IndexCarousel::create([
                'img_local' => $faker->image(),
                'img_title' => $faker->title,
                'img_url' => $faker->url,
                'sort' => $faker->numberBetween(0, 255),
            ]);
        }
    }
}
