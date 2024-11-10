const ReportResult = ({ result }: { result: string }) => {
  return (
    <section className="output-panel">
      <h2>Your Report 😜</h2>
      <p>{result}</p>
    </section>
  );
};

export default ReportResult;
