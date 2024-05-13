interface Option {
  value: string;
  label: string;
  description: string;
}

interface ProductFieldProps {
  label: string;
  placeholder?: string;
  type: 'text' | 'select' | 'textarea' | 'radio' | 'date';
  maxLength?: number;
  suffix?: string;
  options?: Option[] | string[];
  height?: number;
  textAreaDetail?: string;
}

const ProductField = ({
  label,
  placeholder,
  type,
  maxLength,
  suffix,
  options,
  height,
  textAreaDetail,
}: ProductFieldProps) => {
  const renderField = () => {
    if (type === 'select') {
      return (
        <div className="flex items-left">
          <span className="w-48 flex-shrink-0 text-left mr-1">{label}</span>
          <select className="shadow appearance-none border rounded w-full md:w-8/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline mt-1 focus:border-mainWhite focus:bg-mainWhite">
            {options &&
              options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </div>
      );
    } else if (type === 'textarea') {
      return (
        <div className="flex items-left">
          <span className="w-48 flex-shrink-0 text-left mr-1">{label}</span>

          <div className="w-full flex flex-col justify-start items-start">
            <textarea
              className={`shadow appearance-none border rounded w-full md:w-8/12 py-3 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite`}
              style={{ height }}
              placeholder={placeholder}
            ></textarea>
            <div className="mt-2 text-left text-sm text-subGray">{textAreaDetail}</div>
          </div>
        </div>
      );
    } else if (type === 'radio') {
      return (
        <div className="flex items-left">
          <span className="w-48 flex-shrink-0 text-left mr-1">{label}</span>
          <div className="flex items-start flex-col">
            {options &&
              options.map((option, idx) => (
                <div key={idx} className="flex items-center">
                  <input
                    type="radio"
                    id={`radio-${idx}`}
                    name={label}
                    className="focus:border-mainWhite focus:bg-mainWhite mr-5"
                    value={option.value}
                  />
                  <label htmlFor={`radio-${idx}`}>{option.label}</label>
                  <span className="text-sm text-subGray ml-7 text-right">{option.description}</span>
                </div>
              ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-left">
          <span className="w-48 flex-shrink-0 text-left mr-1">{label}</span>
          <input
            className={`shadow appearance-none border rounded w-full md:w-8/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite`}
            type={type}
            placeholder={placeholder}
            maxLength={maxLength}
          />
          {suffix ? (
            <span className="text-sm text-white ml-3">{suffix}</span>
          ) : (
            <span className="text-sm text-white ml-3">{maxLength}</span>
          )}
        </div>
      );
    }
  };

  return (
    <div className="mb-4">
      {renderField()}
      <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
    </div>
  );
};

export default ProductField;
