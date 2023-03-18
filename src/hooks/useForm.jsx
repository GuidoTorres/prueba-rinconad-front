import { useState } from "react";
const useForm = (config) => {
  const [form, setForm] = useState(config);

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setForm((values) => {
      return { ...values, [name]: value };
    });
  };


  return [form, handleChange];
};

export default useForm;
