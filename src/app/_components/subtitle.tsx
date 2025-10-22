interface ISubtitle {
  text: string
}

const Subtitle = ({ text }: ISubtitle) => {
  return (
    <>
      <h2 className="mb-2 mt-6 text-xs font-bold uppercase text-gray-400">
        {text}
      </h2>
    </>
  )
}

export default Subtitle
