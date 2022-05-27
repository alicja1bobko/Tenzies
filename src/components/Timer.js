import { useElapsedTime } from 'use-elapsed-time'

export default function Timer(props) {

  const { elapsedTime } = useElapsedTime({
    isPlaying: props.isOn,
    updateInterval: 0.02
  });
  
  
  
  return <span>{elapsedTime.toFixed(2)}</span>
}