<?php

namespace App\Admin\Controllers\IndexPage;

use App\Models\IndexPage\IndexCarousel;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Layout\Content;
use Encore\Admin\Show;

class IndexCarouselController extends Controller
{
    use HasResourceActions;

    /**
     * Index interface.
     *
     * @param Content $content
     * @return Content
     */
    public function index(Content $content)
    {
        return $content
            ->header('轮播图')
            ->description('管理')
            /* ->breadcrumb(
                ['text' => '首页', 'url' => '/admin'],
                ['text' => '用户管理', 'url' => '/admin/users'],
                ['text' => '编辑用户']
            )//面包屑导航 */
            ->body($this->grid());
    }

    /**
     * Show interface.
     *
     * @param mixed $id
     * @param Content $content
     * @return Content
     */
    public function show($id, Content $content)
    {
        return $content
            ->header('详细')
            ->description('信息')
            ->body($this->detail($id));
    }

    /**
     * Edit interface.
     *
     * @param mixed $id
     * @param Content $content
     * @return Content
     */
    public function edit($id, Content $content)
    {
        return $content
            ->header('编辑')
            ->description('信息')
            ->body($this->form()->edit($id));
    }

    /**
     * Create interface.
     *
     * @param Content $content
     * @return Content
     */
    public function create(Content $content)
    {
        return $content
            ->header('创建')
            ->description('新的轮播图')
            ->body($this->form());
    }

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new IndexCarousel);

        $grid->id('Id');
        $grid->img_local('图片')->image(config('app.url').'//uploads/', 100, 100);
        $grid->img_title('图片标题');
        $grid->img_url('图片跳转链接')->displayUrl();
        $grid->sort('排序值（升序）')->sortable()->editable();      //sortable()可排序，editable()可修改
        
        // 设置text、color、和存储值 color可选`danger`红色、`warning`橙色、`info`蓝色、`primary`深灰色、`default`灰色、`success`绿色
        $states = [
            'on'  => ['value' => 1, 'text' => '已启用', 'color' => 'success'],
            'off' => ['value' => 0, 'text' => '已关闭', 'color' => 'danger'],
        ];
        $grid->is_enable('是否启用')->switch($states);   //switch创建切换按钮
        $grid->created_at('创造时间');
        $grid->updated_at('更新时间');
        //$grid->deleted_at('Deleted at');

        $grid->filter(function($filter){
            //$filter->scope('trashed', '被软删除的数据')->onlyTrashed(); 可以展示软删除的数据,但是无法更改
            $filter->in('is_enable', '是否启用')->checkbox([1 => '已启用', 0 => '已禁用']);

        });

        return $grid;
    }

    /**
     * Make a show builder.
     *
     * @param mixed $id
     * @return Show
     */
    protected function detail($id)
    {
        $show = new Show(IndexCarousel::findOrFail($id));

        $show->id('Id');
        $show->img_local('图片位置')->image();
        $show->img_title('图片标题');
        $show->img_url('图片跳转链接')->link();
        $show->sort('排序大小');
        $show->is_enable('是否启用')->using([0 => '已禁用', 1 => '已启用']);
        $show->created_at('创建时间');
        $show->updated_at('更改时间');
        //$show->deleted_at('Deleted at');

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new IndexCarousel);

        $form->image('img_local', '轮播图')->move('images/carousel')->rules('required|max:150');
        $form->text('img_title', '图片标题')->rules('max:100');
        $form->url('img_url', '图片链接地址')->rules('required|max:150');
        $form->number('sort', '排序顺序（越小越靠前）')->default(1)->min(0)->max(255);
        $form->switch('is_enable', '是否启用')->default(1);

        return $form;
    }
}
