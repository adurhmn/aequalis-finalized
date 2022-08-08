import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

CloseIcon = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);

  &:hover {
    color: black;
  }
`;

const StyledDiv = styled("div")`
  background-color: #fff7c9;
  color: #97894c;
  width: 100%;
  border-radius: 3px;
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 2rem;
  position: relative;
  height: 5rem;
`;

const Tip = styled("p")`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ToolTip = (props) => {
  const { tip, closeToolTip } = props;

  return (
    <StyledDiv>
      <Tip>{tip}</Tip>
      <CloseIcon onClick={closeToolTip} fontSize="large" />
    </StyledDiv>
  );
};

export default ToolTip;
