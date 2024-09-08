import AddIcon from "@/Icons/addIcon";

const MyForm = () => {
  return (
    <section className="action-panel">
      <form id="ticker-input-form">
        <label htmlFor="ticker-input">
          Add up to 3 stock tickers below to get a super accurate stock
          predictions report👇
        </label>
        <div className="form-input-control">
          <input type="text" id="ticker-input" placeholder="MSFT" />
          <button className="add-ticker-btn">
            <AddIcon />
          </button>
        </div>
      </form>
      <p className="ticker-choice-display">Your tickers will appear here...</p>
      <button className="generate-report-btn" type="button" disabled>
        Generate Report
      </button>
      <p className="tag-line">Always correct 15% of the time!</p>
    </section>
  );
};

export default MyForm;
