import styles from "@/styles/Home.module.css";
import CountdownTimer from "@/components/CountdownTimer";
import MinuteSelector from "@/components/MinuteSelector";

export default function Home() {
  return (
    <MinuteSelector text="Session" initialValue={25} />
  );
}
