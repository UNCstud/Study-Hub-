import MedGuessGame from '../../components/MedGuessGame';

export const metadata = {
  title: 'MedGuess — Daily Clinical Diagnosis Game',
  description: 'Guess the diagnosis from real clinical cases with labs, vitals, and imaging. A new case every day.',
};

export default function GamePage() {
  return <MedGuessGame />;
}
