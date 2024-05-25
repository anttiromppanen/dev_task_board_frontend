import { Dispatch, SetStateAction } from "react";

function DescriptionTextarea({
  descriptionInputValue,
  setDescriptionInputValue,
}: {
  descriptionInputValue: string;
  setDescriptionInputValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <label htmlFor="description">
      Description
      <textarea
        id="description"
        rows={6}
        value={descriptionInputValue}
        onChange={(e) => setDescriptionInputValue(e.target.value)}
        placeholder="Enter a short description"
        className="mt-1 w-full rounded-xl border-2 border-userLightGrey px-4 py-2 placeholder:font-light focus:outline-userBlue"
      />
    </label>
  );
}

export default DescriptionTextarea;
