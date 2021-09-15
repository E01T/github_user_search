export const OutputMessage = ({ outputMessage }: { outputMessage: string }) => {
  return (
    <div className="container-lg">
      <div className="row">
        <div className="d-flex justify-content-center text-danger">
          <output role="alert" data-testid="output-message">
            {outputMessage}
          </output>
        </div>
      </div>
    </div>
  )
}
