import { useState } from 'react';
import UploadForm from '../components/UploadForm';
import StatusTracker from '../components/StatusTracker';
import ResultOutput from '../components/ResultOutput';

export default function Home() {
  const [taskId, setTaskId] = useState('');
  const [result, setResult] = useState(null);

  return (
    <div>
      <h1>Система обработки изображений</h1>
      {!taskId ? (
        <UploadForm onStart={setTaskId} />
      ) : !result ? (
        <StatusTracker taskId={taskId} onResult={setResult} />
      ) : (
        <ResultOutput result={result} />
      )}
    </div>
  );
}