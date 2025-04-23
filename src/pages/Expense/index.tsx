import { useEffect, useState } from "react";
import { Col, Empty, Image, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import _, { chain } from "lodash";
import "./style.css";

import Dollar from "../../assets/dollars.webp";
import ExpenseModal from "../../components/ExpenseModal";
import LoadingComponent from "../../components/LoadingComponent";
import { Expense } from "../../expense_types";
import { expense_members } from "../../mock_data";
import { useAtom } from "jotai";
import { selectedGroupAtom } from "../../atom/group.atom";
import { useDispatch, useSelector } from "react-redux";
import { IReducers } from "../../redux/store";
import {
  createExpenseAction,
  getExpensesAction,
} from "../../redux/action/expense.action";

const Expenses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  //   const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expense>();
  const dispatch: any = useDispatch();

  const { expenses, loading } = useSelector(
    (reducer: IReducers) => reducer.expense
  );

  const calculateTotalExpense = () => {
    return expenses.reduce((a, b) => {
      a = a + b.amount;
      return a;
    }, 0);
  };

  const [group] = useAtom(selectedGroupAtom);

  useEffect(() => {
    fetchExpense();
  }, []);

  // Here gonna call GET LIST API
  const fetchExpense = () => {
    dispatch(getExpensesAction(group?.id as any));
  };

  // Here gonna call POST EXPENSE API
  const addExpense = (expense: Expense) => {
    dispatch(
      createExpenseAction({
        ...expense,
        group,
        user: expense.paid_by,
        name: expense.title,
      })
    );
    setIsOpen(false);
  };

  // Here gonna call PUT EXPENSE API
  const editExpense = () => {};

  const transformMember = () => {
    return group?.users.map((item) => {
      return {
        ...item,
        name: item.first_name + " " + item.last_name,
        isChecked: true,
      };
    }) as any;
  };

  const averageExpense = () => {
    return calculateTotalExpense() / (group?.users?.length ?? 1);
  };

  const calculateEachMemberTotalExpenses = () => {
    return chain(expenses)
      .groupBy((item) => `${item.user.id}/${item.user.first_name}`)
      .map((value, key) => {
        const totalSpending = value.reduce((a, b) => {
          a = a + b.amount;
          return a;
        }, 0);
        const debt = averageExpense() - totalSpending;
        return {
          totalSpending,
          debt,
          user_id: key.split("/")[0],
        };
      })
      .value();
  };

  const mappedExpenseUser = () => {
    const data = group?.users.map((user) => {
      const dept = calculateEachMemberTotalExpenses().find(
        (item) => String(item.user_id) === String(user.id)
      );
      return {
        ...user,
        debt: dept?.debt ?? averageExpense(),
      };
    });
    return data;
  };

  if (loading) return <LoadingComponent></LoadingComponent>;

  return (
    <div className="container relative h-full">
      {_.isEmpty(expenses) ? (
        <div className="h-full flex items-center">
          <div className="text-center">
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              description={<h1 className="text-white">No Expenses Yet</h1>}
            />
            <p>
              Add an expense by tapping on the "+" to start tracking and
              splitting your expenses
            </p>
          </div>
        </div>
      ) : (
        <div className="container" style={{ width: 1000 }}>
          <h1>Total Expense: ${calculateTotalExpense().toFixed(2)}</h1>
          <Row gutter={16} style={{ width: 1000 }}>
            <Col span={12}>
              <div className="expenses_list-wrapper">
                <h3 className="mb-0">Expenses:</h3>
                {expenses?.map((i, inx) => (
                  <div
                    className="expenses_list-item"
                    key={`exp_${inx}_${i.id}`}
                  >
                    <img src={Dollar} width={24} height={24} />
                    <div className="expense_detail">
                      <div className="expense_title">{i?.name}</div>
                      <div className="expense_detail">
                        Paid by: {i?.user?.first_name}
                      </div>
                    </div>
                    <div className="expense_amount">
                      {i.amount.toFixed(2)} $
                    </div>
                    {/* <div className="expense_delete">Delete</div> */}
                  </div>
                ))}
              </div>
            </Col>
            <Col span={12}>
              <div className="expenses_list-wrapper">
                <h3 className="mb-0">Participants:</h3>
                {mappedExpenseUser()?.map((i, inx) => (
                  <div
                    className="expenses_list-item"
                    key={`exp_${inx}_${i.id}`}
                  >
                    <Image
                      src={
                        "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
                      }
                      width={24}
                      height={24}
                    />
                    <div className="expense_detail">
                      <div className="expense_title">{i?.first_name}</div>
                      <div className="expense_detail"></div>
                    </div>
                    <div
                      className="expense_amount"
                      style={{ color: i.debt > 0 ? "#f24805" : "#36c936" }}
                    >
                      {i.debt > 0 ? "-" : "+"}
                      {Math.abs(i.debt).toFixed(2)} $
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="floating_button flex items-center justify-center"
      >
        <PlusOutlined />
      </div>

      <ExpenseModal
        isModalOpen={isOpen}
        loading={loadingConfirm}
        handleOk={addExpense}
        handleCancel={() => setIsOpen(false)}
        title={"Add Expense"}
        submitTxt={"Add"}
        members={transformMember()}
      />
      <ExpenseModal
        isModalOpen={isEditOpen}
        loading={loadingConfirm}
        handleOk={editExpense}
        handleCancel={() => setIsOpen(false)}
        title={"Edit Expense"}
        submitTxt={"Edit"}
        expense={selectedExpense}
        members={expense_members}
      />
    </div>
  );
};

export default Expenses;
