import { Component } from "react";
import { headerData, meetTrackList } from "../../static-data";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import { Status } from "../../models";
import CustomPagination from "../CustomPagination/CustomPagination";
import { type NavigateFunction, useNavigate } from "react-router-dom";

// Normalizing meet list
const normalizeMeetList = meetTrackList.map((item) => ({
  ...item,
  meeting_date: item.meeting_date ? new Date(item.meeting_date) : null,
}));

interface Props {
  navigate: NavigateFunction;
}

interface State {
  fakeMeetList: typeof normalizeMeetList;
  currentPage: number;
  pageSize: number;
}

class MeetTable extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fakeMeetList: normalizeMeetList,
      currentPage: 1,
      pageSize: 10,
    };
  }

  handlePageSizeChange = (size: number) => {
    this.setState({
      pageSize: size,
      currentPage: 1,
    });
  };

  handleDateChange = (id: number, date: Date | null) => {
    this.setState((prevState) => ({
      fakeMeetList: prevState.fakeMeetList.map((meet) =>
        meet.id === id ? { ...meet, meeting_date: date } : meet
      ),
    }));
  };

  getStatusClass = (status: string) => {
    switch (status) {
      case Status.APPROVED:
        return "status-success";
      case Status.DECLINED:
        return "status-danger";
      default:
        return "";
    }
  };

  render() {
    const { fakeMeetList, currentPage, pageSize } = this.state;
    const { navigate } = this.props;

    const totalItems = fakeMeetList.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * pageSize;
    const currentRows = fakeMeetList.slice(startIndex, startIndex + pageSize);

    return (
      <div className="w-100 h-100 d-flex flex-column justify-content-around p-2">
        <table className="table meet-table">
          <thead>
            <tr>
              {headerData.map((headerItem: string, index) => (
                <th key={index} scope="col" className="text-color fw-semibold">
                  {headerItem}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((meet) => (
              <tr key={meet.id}>
                <td>{meet.customer_name}</td>
                <td>{meet.contact_name}</td>
                <td>{meet.designation}</td>
                <td>{meet.zone}</td>
                <td>{meet.location}</td>
                <td>{meet.spoc}</td>
                <td>{meet.requester}</td>
                <td>{meet.objective}</td>
                <td>{meet.remarks}</td>
                <td>
                  <span className={this.getStatusClass(meet.status)}>
                    {meet.status}
                  </span>
                </td>
                <td>
                  {meet.meeting_date && (
                    <CustomDatePicker
                      value={meet.meeting_date}
                      onChange={(date) => this.handleDateChange(meet.id, date)}
                    />
                  )}
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-end gap-2">
                    {meet.status === "Approved" ? null : (
                      <>
                        <i className="bi bi-check-circle status-success cursor-pointer"></i>
                        <i
                          className={`bi bi-x-circle ${
                            meet.status === Status.DECLINED
                              ? "icon-disabled cursor-disabled"
                              : "status-danger cursor-pointer"
                          }`}
                        ></i>
                      </>
                    )}
                    <i
                      className="bi bi-pencil-square cursor-pointer text-gray"
                      onClick={() => navigate("/remarks")}
                    ></i>
                    <i className="bi bi-trash3 cursor-pointer icon-gray"></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <CustomPagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={safePage}
          onPageChange={(page) => this.setState({ currentPage: page })}
          onPageSizeChange={this.handlePageSizeChange}
        />
      </div>
    );
  }
}

export default function MeetTableWithNavigate() {
  const navigate = useNavigate();
  return <MeetTable navigate={navigate} />;
}
