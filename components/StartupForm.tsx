"use client";

import React, { useActionState, useState } from "react";
import { form } from "sanity/structure";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { AwardIcon, SendIcon } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createidea } from "@/lib/actions";
import { author } from "@/sanity/schemaTypes/author";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch: pitch,
      };
      await formSchema.parseAsync(formValues);
      const resulte = await createidea(prevState, formData, pitch);
      if (resulte.status === "SUCCESS") {
        toast({
          title: "Startup submitted successfully!",
        });
        router.push("/startup/${resulte._id}");
        return {
          ...prevState,
          error: "",
          status: "SUCCESS",
        };
      }
      return resulte;
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Form submission failed.",
        description: "Please check the form for errors and try again.",
        variant: "destructive",
      });
      return {
        ...prevState,
        error: "Form submission failed.",
        status: "ERROR",
      };
    } finally {
    }
  };

  const [state, formActoin, isPinding] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formActoin} className="startup-form">
      <div>
        <label htmlFor="title " className="startup-form_label">
          Title
        </label>
        <Input
          type="text"
          required
          id="title"
          name="title"
          placeholder="Startup Title"
          className="startup-form_input"
        />
        {errors.title && <p className="startup-form_error">errors.title</p>}
      </div>

      <div>
        <label htmlFor="description " className="startup-form_label">
          Description
        </label>
        <Textarea
          required
          id="description"
          name="description"
          placeholder="Startup Description"
          className="startup-form_textarea "
        />
        {errors.description && (
          <p className="startup-form_error">errors.description</p>
        )}
      </div>

      <div>
        <label htmlFor="category " className="startup-form_label">
          Category
        </label>
        <Input
          required
          id="category"
          name="category"
          placeholder="Startup Category (Tech, Health, Finance, etc.)"
          className="startup-form_input"
        />
        {errors.category && (
          <p className="startup-form_error">errors.category</p>
        )}
      </div>

      <div>
        <label htmlFor="Link " className="startup-form_label">
          Image URL
        </label>
        <Input
          required
          id="link"
          name="link"
          placeholder="Startup Image URL"
          className="startup-form_input"
        />
        {errors.link && <p className="startup-form_error">errors.link</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch " className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          id="pitch"
          preview="edit"
          height={300}
          onChange={(value) => setPitch(value as string)}
          className="border border-black-200 rounded-sm overflow-hidden"
          textareaProps={{
            placeholder: "Brifly describe your startup idea... ",
          }}
          previewOptions={{ disallowedElements: ["style"] }}
        />
        {errors.pitch && <p className="startup-form_error">errors.pitch</p>}
      </div>
      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPinding}
      >
        {isPinding ? "Submitting..." : "Submit Startup"}
        <SendIcon className="aize-6 ml-2 " />
      </Button>
    </form>
  );
};

export default StartupForm;
