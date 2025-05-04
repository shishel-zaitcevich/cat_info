export const FlexDemo: React.FC = () => {
  return (
    <div style={{ padding: '20px', height: '100vh', backgroundColor: '#fff' }}>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h2>Пример: Flex vs Inline-Flex</h2>

        <h3>Flex (блочный элемент)</h3>
        <div
          style={{
            display: 'flex',
            backgroundColor: '#d0ebff',
            padding: '10px',
            marginBottom: '20px',
          }}
        >
          <img
            src="https://via.placeholder.com/24"
            alt="Иконка"
            style={{ marginRight: '8px' }}
          />
          <span>Текст рядом с иконкой (Flex)</span>
        </div>

        <p>
          Текст до{' '}
          <span
            style={{
              display: 'flex',
              backgroundColor: '#ffd6d6',
              padding: '5px',
            }}
          >
            Флекс-блок
          </span>{' '}
          текст после
        </p>

        <hr style={{ margin: '30px 0' }} />

        <h3>Inline-Flex (инлайновый элемент)</h3>
        <div
          style={{
            display: 'inline-flex',
            backgroundColor: '#c0f7d1',
            padding: '10px',
            marginBottom: '20px',
          }}
        >
          <img
            src="https://via.placeholder.com/24"
            alt="Иконка"
            style={{ marginRight: '8px' }}
          />
          <span>Текст рядом с иконкой (Inline-Flex)</span>
        </div>

        <p>
          Текст до{' '}
          <span
            style={{
              display: 'inline-flex',
              backgroundColor: '#ffe9c6',
              padding: '5px',
            }}
          >
            Инлайн-флекс
          </span>{' '}
          текст после
        </p>
      </div>
    </div>
  );
};
