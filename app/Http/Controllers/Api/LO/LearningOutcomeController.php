<?php
/**
 * Bu yazılım Elektrik Elektronik Teknolojileri Alanı/Elektrik Öğretmeni Hakan GÜLEN tarafından geliştirilmiş olup geliştirilen bütün kaynak kodlar
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) ile lisanslanmıştır.
 * Ayrıntılı lisans bilgisi için https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.tr sayfasını ziyaret edebilirsiniz.2019
 */

namespace App\Http\Controllers\Api\LO;


use App\Http\Controllers\ApiController;
use App\Http\Controllers\ResponseHelper;
use App\Models\LearningOutcome;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Kazanım kayıt ve listeleme kontrolcüsü
 * Class LearningOutcomeController
 * @package App\Http\Controllers\Api\LO
 */
class LearningOutcomeController extends ApiController
{
  public function create(Request $request) {

    $validationResult = $this->apiValidator($request, [
      'branch_id' => 'required',
      "code" => "required",
      "content" => "required"
    ]);

    if ($validationResult) {
      return response()->json($validationResult,422);
    }

    $data = $request->only(["branch_id", "code", "content","description"]);

    try {

      $branch = new LearningOutcome();
      $branch->fill($data);
      $branch->save();
    }
    catch (Exception $exception) {
      return response()->json($this->apiException($exception), 500);
    }
    return response()->json([ResponseHelper::MESSAGE => "Kazanım kayıt işlemi başarılı."], 201);
  }

  public function update(Request  $request, $id) {

    $validationResult = $this->apiValidator($request, [
      'branch_id' => 'required',
      "content" => "required"
    ]);

    if ($validationResult) {
      return response()->json($validationResult,422);
    }

    try {

      $lo = LearningOutcome::findOrFail($id);
      $lo->branch_id = $request->input("branch_id");
      $lo->content = $request->input("content");
      $lo->description = $request->input("description");
      $lo->save();

    } catch (Exception $exception) {
      return response()->json($this->apiException($exception), 500);
    }
    return response()->json([ResponseHelper::MESSAGE => "Kazanım güncelleme işlemi başarılı."], 201);
  }

  public function delete($id) {
    $res = LearningOutcome::destroy($id);
    if ($res)
      return response()->json([ResponseHelper::MESSAGE => "Kazanım silme işlemi başarılı."], 200);
    return response()->json([ResponseHelper::MESSAGE => "Kazanım silme işlemi başarısız."], 450);
  }

  public function getByClassLevelAndLessonId() {

  }

  public function findByContentAndLessonIdAndClassLevel(Request $request) {

    $validationResult = $this->apiValidator($request, [
      'lesson_id' => 'required',
      "content" => "required",
      "class_level" => "required",
    ]);

    if ($validationResult) {
      return response()->json($validationResult,422);
    }

    $content = $request->input("content");
    $lesson_id = $request->input("lesson_id");
    $class_level = $request->input("class_level");

   $lo = LearningOutcome::where([
      ["branch_id", "=", $lesson_id],
      ["class_level", "=", $class_level],
      ["content", "like", "%".$content."%"]
    ])->select("id", "code", "content")
      ->get();
    return response()->json($lo, 200);

  }
}
