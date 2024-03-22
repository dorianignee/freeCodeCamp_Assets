import MinuteSelector from "./MinuteSelector";

export default function Clock() {
  return (
    <div id="clock">
      <MinuteSelector 
        text="Pause"
        disabled={false}
        initialValue={5}
      />
      
    </div>
  )
}