export interface ErrorProps {
  error: Error
}

export function ShowError({ error }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 my-5">
      <img
        src="https://s1.hdslb.com/bfs/static/jinkela/long/bitmap/error_01.png"
        alt="parse failed"
        // @ts-expect-error
        referrerpolicy="no-referrer"
      />
      <p>Σ(oﾟдﾟoﾉ) 发生了一些错误</p>
      <p>{`message: ${error.message}`}</p>
    </div>
  )
}
