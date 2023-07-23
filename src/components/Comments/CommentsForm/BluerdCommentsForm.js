function BluredCommentsForm() {
  return (
    <>
      <div className="p-4 rounded-lg">
        <label htmlFor="comment" className="font-medium mb-1 block">
          Dodaj komentarz:
        </label>
        <textarea
          id="comment"
          className="border-gray-300 border p-2 rounded-md w-full"
          rows="4"
          disabled={true}
        />
        <button
          type="button"
          disabled={true}
          className="bg-black text-white py-2 px-4 mt-2 rounded-lg hover:bg-blue-600"
        >
          Wyślij
        </button>
      </div>
    </>
  );
}

export default BluredCommentsForm;
