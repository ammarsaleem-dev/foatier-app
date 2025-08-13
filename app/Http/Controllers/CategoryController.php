<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage') ?? 10;
        $categories = Category::orderBy('created_at', 'desc')->paginate($perPage);
        return inertia('Category/Browse', ['categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Category/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validated = $request->validate(
            [
                'name' => 'required|unique:categories,name'
            ],
            [
                'name.required' => 'Category name is required',
                'name.unique' => 'This name is already exists.'
            ]
        );

        Category::create($validated);

        return redirect(route('category.index'))
            ->with(
                'flash',
                [
                    'type' => 'success',
                    'message' => 'Category created successfully!'
                ]
            );
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return inertia('Category/Show', ['category' => $category]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('Category/Update', ['category' => $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        
           $validated = $request->validate(
            [
                'name' => 'required|unique:categories,name,' . $category->name,
            ],
            [
                'name.required' => 'Category name is required',
                'name.unique' => 'Category name is existed, try another one.'
            ]
        );

        $category->update($validated);

        return redirect(route('category.index'))
            ->with(
                'flash',
                [
                    'type' => 'success',
                    'message' => 'Category updated successfully!'
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect(route('category.index'))->with('flash', ['type' => 'success', 'message' => 'Category deleted successfully!']);
    }

    /**
     * Bulk delete categories.
     */
    public function bulkDelete($ids)
    {
        
        $ids = explode(',', $ids);

        Category::whereIn('id', $ids)->delete();

        return redirect(route('category.index'))->with('flash', ['type' => 'success', 'message' => 'Selected categories deleted successfully!']);
    }
}
