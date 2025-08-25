<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class ProductController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('can:viewAny,App\Models\Product', only: ['index']),
            new Middleware('can:create,App\Models\Product', only: ['create', 'store']),
            new Middleware('can:view,product', only: ['show']),
            new Middleware('can:update,product', only: ['edit', 'update']),
            new Middleware('can:delete,product', only: ['destroy']),
        ];
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage    = $request->input('perPage') ?? 10;
        $products = Product::orderBy('created_at', 'desc')->paginate($perPage);
        return inertia('Product/Browse', ['products' => $products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        $brands = Brand::all();
        return inertia('Product/Create',[
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
            'description' => 'nullable|string',
            'sku' => 'required|string|max:255|unique:products,sku',
            'uom' => 'nullable|string|max:50',
            'size' => 'nullable|string|max:50',
            'status' => 'required|in:active,inactive',
            'brand_id' => 'nullable|exists:brands,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        Product::create($validated);

        return redirect()->route('product.index')->with(
                'flash',
                [
                    'type'    => 'success',
                    'message' => 'Product created successfully!',
                ]
            );
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load(['brand', 'category']);
        return inertia('Product/Show', [
            'product' => $product,
            'brand' => $product->brand,
            'category' => $product->category,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
        $brands = Brand::all();
        return inertia('Product/Update', [
            'product' => $product,
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
            'description' => 'nullable|string',
            'sku' => 'required|string|max:255|unique:products,sku,' . $product->id,
            'uom' => 'nullable|string|max:50',
            'size' => 'nullable|string|max:50',
            'status' => 'required|in:active,inactive',
            'brand_id' => 'nullable|exists:brands,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        }else{
            // If no new image is uploaded, retain the old image path
            $validated['image'] = $product->image;
        }

        $product->update($validated);

        return redirect()->route('product.show', $product->id)->with(
                'flash',
                [
                    'type'    => 'success',
                    'message' => 'Product updated successfully!',
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
        return redirect()->route('product.index')->with(
                'flash',
                [
                    'type'    => 'success',
                    'message' => 'Product deleted successfully!',
                ]
            );
    }
}
