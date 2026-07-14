import { FaArrowUp } from "react-icons/fa";
import { useForm } from "react-hook-form";
import type { KeyboardEvent } from "react";

export type ChatFormData = {
  prompt: string;
};

type Props = {
  onSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

  const submit = handleSubmit((data) => {
    reset({ prompt: "" });
    onSubmit(data);
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form
      onSubmit={submit}
      onKeyDown={handleKeyDown}
      className="flex flex-col gap-2 items-end border-2 border-gray-200 p-4 rounded-3xl"
      style={{ background: "#1e1d1c", border: "1px solid #d6d5d424" }}
    >
      <textarea
        {...register("prompt", {
          required: true,
          validate: (data) => data.trim().length > 0,
        })}
        className="w-full border-0 focus:outline-0 resize-none text-white scrollbar-thin [scrollbar-color:#525252_transparent]"
        placeholder="Ask Anything"
        maxLength={100}
        autoFocus={true}
      />
      <button
        disabled={!formState.isValid}
        className={`rounded-full w-9 h-9 flex justify-center items-center ${
          !formState.isValid ? "bg-gray-400" : "bg-white"
        }`}
      >
        <FaArrowUp />
      </button>
    </form>
  );
};

export default ChatInput;
