import { Badge, Table, Input, Button, Popconfirm, Form,Dropdown,Menu,Icon } from 'antd';
import React from 'react';

const menu = (
  <Menu>
    <Menu.Item>Done</Menu.Item>
    <Menu.Item>In Progress</Menu.Item>
  </Menu>
);

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);


class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}


class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Assumption',
        dataIndex: 'title',
        width: '70%',
        editable: true,
      },
      {
        title: 'Category',
        dataIndex: 'category',
      },

      // {
      //   title: 'operation',
      //   dataIndex: 'operation',
      //   render: (text, record) =>
      //     this.state.dataSource.length >= 1 ? (
      //       <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteAssumption(record.id)}>
      //         <a>Delete</a>
      //       </Popconfirm>
      //     ) : null,
      // },
    ];


  }




  // handleAdd = () => {
  //   const { count, dataSource } = this.state;
  //   const newData = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   this.setState({
  //     dataSource: [...dataSource, newData],
  //     count: count + 1,
  //   });
  // };

addCheck = (r) => {
  this.props.addChecklist(r.id);

}


  expandedRowRender = (r) => {

    const columns = [
      { title: 'Title',  editable: true, dataIndex: 'title', key: 'title' },
      { title: 'Id', dataIndex: 'id', key: 'id' },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },

      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span className="table-operation">
            <a>Actions</a>
            <Dropdown overlay={menu}>
              <a>
                More <Icon type="down" />
              </a>
            </Dropdown>
          </span>
        ),
      },
    ];

    return <div>
    <Button onClick={() => this.addCheck(r)}>Add Experiment</Button>
    <Table columns={columns} dataSource={r.experiments} pagination={false} />
    </div>;
  };

  render() {
    const { assumptions } = this.props;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.props.saveAssumption,
        }),
      };
    });

    return (
      <div>

        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={assumptions}
          expandedRowRender={(r) => this.expandedRowRender(r)}
          columns={columns}
        />
      </div>
    );
  }
}

export default EditableTable;