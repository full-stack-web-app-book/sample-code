import styled from "styled-components";

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

export const ButtonContainer = styled.div`
  text-align: center;
  margin: 20px 0;
`;

export const AddButton = styled.button`
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  border: none;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

export const CancelButton = styled.button`
  display: inline-block;
  background-color: #95a5a6;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  margin-left: 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #7f8c8d;
  }
`;

export const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 10px;
`;

export const SummaryBox = styled.div<{
  type: "income" | "expense" | "balance";
}>`
  flex: 1;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 150px;

  h2 {
    color: ${(props) => {
      switch (props.type) {
        case "income":
          return "#27ae60";
        case "expense":
          return "#e74c3c";
        case "balance":
          return "#3498db";
        default:
          return "#34495e";
      }
    }};
  }

  p {
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 10px;
    color: ${(props) => {
      switch (props.type) {
        case "income":
          return "#27ae60";
        case "expense":
          return "#e74c3c";
        case "balance":
          return props.children &&
            parseInt(props.children.toString().replace(/[^0-9-]/g, "")) < 0
            ? "#e74c3c"
            : "#3498db";
        default:
          return "#34495e";
      }
    }};
  }
`;

export const HistoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

export const HistorySection = styled.div`
  flex: 1;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  min-width: 300px;
`;

export const HistoryList = styled.div`
  margin-top: 10px;
`;

export const HistoryItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

export const HistoryDate = styled.div`
  color: #7f8c8d;
  font-size: 0.9em;
`;

export const IncomeAmount = styled.div`
  color: #27ae60;
  font-weight: bold;
`;

export const ExpenseAmount = styled.div`
  color: #e74c3c;
  font-weight: bold;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 20px;

  label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  input {
    margin-right: 5px;
  }
`;
