import Image from "next/image";

const FormInput = ({ icon, type, name, placeholder, value, onChange }) => {
  return (
    <div className="signup__form-group flex items-center border border-white rounded-md w-3/4 sm:w-full mx-auto p-2 my-4">
      <Image
        src={icon}
        alt={`${name} icon`}
        className="signup__icon p-0"
        width={20}
        height={20}
      />
      <input
        type={type}
        name={name}
        className="signup__input border-none text-base w-5/6 bg-transparent text-white placeholder:text-white font-montserrat ml-2 focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
