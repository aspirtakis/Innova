import { Badge, Table, Input, Button, Popconfirm, Form,Dropdown,Menu,Icon} from 'antd';
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
        width: '60%',
        editable: true,
      },
      {
        title: 'Category',
        dataIndex: 'category',
      },
      {
        title: 'Actions',
        dataIndex: 'operation',
        key: 'operation',
        render: (text,record) => (
          <span className="table-operation">
          <Popconfirm title="Sure to Aprrove?" onConfirm={() => this.props.deleteAssumption(record)}>
          <Icon  style={{margin:5}} type="check" />
       </Popconfirm>


          <Popconfirm title="Sure to Reject" onConfirm={() => this.props.deleteAssumption(record)}>
          <Icon  style={{margin:5}} type="close" />
       </Popconfirm>

           <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteAssumption(record)}>
           <Icon  style={{margin:5}} type="delete" />
        </Popconfirm>

          </span>
        ),
      },
    ];
  }


addCheck = (r) => {
  this.props.addChecklist(r);
}


  expandedRowRender = (r) => {
    const columns2 = [
      { title: 'Title', width: '60%', editable: true, dataIndex: 'title', key: 'title',editable:true},
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
        title: 'Actions',
        dataIndex: 'operation',
        key: 'operation',
        // render: (text, record) => (
        //   <span className="table-operation">
        //   <Icon  style={{margin:10}} type="check" />
        //   <Icon  style={{margin:10}} onClick={() => console.log(record)} type="delete" />
        //   </span>
        // ),
      
        render: (text, record) =>
          <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteChecklist(r,record.id)}>
            <a>Delete</a>
          </Popconfirm>
      },
    ];

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns4 = columns2.map(col => {
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
          handleSave: (row) => this.props.saveChecklist(r,row),
        }),
      };
    });

    return <div>
    <Button onClick={() => this.addCheck(r)}>Add Experiment</Button>
    <Table            
    components={components}
    rowClassName={() => 'editable-row'}
    bordered columns={columns4} 
    dataSource={r.experiments} 
    pagination={true} />
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