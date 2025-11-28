import React from "react";
import { headerData, meetTrackList } from "../../static-data";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import { Status } from "../../models";

const normalizeMeetList = meetTrackList.map((item) => ({
  ...item,
  meeting_date: item.meeting_date ? new Date(item.meeting_date) : null,
}));

const MeetTable = () => {
  const [fakeMeetList, setFakeMeetList] = React.useState(normalizeMeetList);

  const handleDateChange = (id: number, date: Date | null) => {
    setFakeMeetList((prev) =>
      prev.map((meet) =>
        meet.id === id ? { ...meet, meeting_date: date } : meet
      )
    );
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-success";
      case "Declined":
        return "text-danger";
      default:
        return "";
    }
  };
  return (
    <div>
      <table className="table border-gray-1">
        <thead>
          <tr>
            {headerData.map((headerItem: string) => (
              <th scope="col" className="fw-semibold">
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fakeMeetList.map((meet) => (
            <React.Fragment>
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
                  <span className={getStatusClass(meet.status)}>
                    {meet.status}
                  </span>
                </td>
                <td>
                  {meet.meeting_date && (
                    <CustomDatePicker
                      value={meet.meeting_date}
                      onChange={(date) => handleDateChange(meet.id, date)}
                    />
                  )}
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-end gap-2">
                    {meet.status === "Approved" ? null : (
                      <>
                        <i className="bi bi-check-circle text-success cursor-pointer"></i>
                        <i
                          className={`bi bi-x-circle cursor-pointer ${
                            meet.status === Status.DECLINED ? "" : "text-danger"
                          }`}
                        ></i>
                      </>
                    )}

                    <i className="bi bi-pencil-square cursor-pointer"></i>
                    <i className="bi bi-trash3 cursor-pointer"></i>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetTable;
