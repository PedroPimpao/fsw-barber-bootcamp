interface ISubtitle {
  text: string
  classname?: string
}

const Subtitle = ({ text, classname = "" }: ISubtitle) => {
  return (
    <>
      <h2
        className={`mb-2 mt-6 text-xs font-bold uppercase text-gray-400 ${classname}`}
      >
        {text}
      </h2>
    </>
  )
}

export default Subtitle
