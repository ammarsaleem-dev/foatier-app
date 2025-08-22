<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class BrandController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('can:viewAny,App\Models\Brand', only: ['index']),
            new Middleware('can:create,App\Models\Brand', only: ['create', 'store']),
            new Middleware('can:view,brand', only: ['show']),
            new Middleware('can:update,brand', only: ['edit', 'update']),
            new Middleware('can:delete,brand', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage    = $request->input('perPage') ?? 10;
        $brands = Brand::orderBy('created_at', 'desc')->paginate($perPage);
        return inertia('Brand/Browse', ['brands' => $brands]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Brand/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'name' => 'required|unique:brands,name',
            ],
            [
                'name.required' => 'Brand name is required',
                'name.unique'   => 'This name is already exists.',
            ]
        );

        Brand::create($validated);

        return redirect(route('brand.index'))
            ->with(
                'flash',
                [
                    'type'    => 'success',
                    'message' => 'Brand created successfully!',
                ]
            );
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        return inertia('Brand/Show', ['brand' => $brand]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        return inertia('Brand/Update', ['brand' => $brand]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brand)
    {
        $validated = $request->validate(
            [
                'name' => 'required|unique:brands,name,' . $brand->name,
            ],
            [
                'name.required' => 'Brand name is required',
                'name.unique'   => 'Brand name is existed, try another one.',
            ]
        );

        $brand->update($validated);

        return redirect(route('brand.index'))
            ->with(
                'flash',
                [
                    'type'    => 'success',
                    'message' => 'Brand updated successfully!',
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        $brand->delete();
        return redirect(route('brand.index'))->with('flash', ['type' => 'success', 'message' => 'Brand deleted successfully!']);
    }

    /**
     * Bulk delete brands.
     */
    public function bulkDelete($ids)
    {

        $ids = explode(',', $ids);

        Brand::whereIn('id', $ids)->delete();

        return redirect(route('brand.index'))->with('flash', ['type' => 'success', 'message' => 'Selected brands deleted successfully!']);
    }
}
