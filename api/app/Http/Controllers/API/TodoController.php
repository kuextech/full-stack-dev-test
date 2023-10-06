<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller; 

use Auth; 
use Hash;
use Mail;
use Str;

use Illuminate\Http\Request; 


use App\Models\Todo;

class TodoController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function index() {
        $todos = Todo::all();
        return response()->json(['todos' => $todos]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'text' => 'required'
        ]);

        $todo = new Todo;
        $todo->text = $validatedData['text'];
        $todo->completed = false;
        $todo->save();

        return response()->json(['message' => 'Task Added!','todo' => $todo]);
    }

    public function completed($id)
    {
        $todo = Todo::find($id);
        $todo->completed = true;
        $todo->save();

        return response()->json(['message' => 'Task Completed!','todo' => $todo]);
    }

    public function delete($id)
    {
        $todo = Todo::find($id);
        $todo->delete();

        return response()->json(['message' => 'Task Deleted!']);
    }
}
