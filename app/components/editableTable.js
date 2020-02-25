import { Badge, Table, Input, Button, Popconfirm, Form,Dropdown,Menu,Icon,Select} from 'antd';
import React from 'react';
import AssumptionStatus from './assumptionStatus';

const { Option } = Select;

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

  toggleEditCombo = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
       
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
    const { children, dataIndex, record, title, fieldType } = this.props;
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

  renderCombo = form => {
    this.form = form;
    const { children, dataIndex, record, title, fieldType } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
  <Select defaultValue={record.category} style={{ width: 120 }} onChange={this.save}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEditCombo}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      fieldType,
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
        {editable ? <div>{ fieldType === 'TextField' && (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) }
        { fieldType === 'ComboBox' && (
          <EditableContext.Consumer>{this.renderCombo}</EditableContext.Consumer>
        ) }
        </div>
        
        : (
          children
        )}
      </td>
    );
  }
}


class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visiblePopoverRecId:0,
    };
    this.columns = [
      {
        title: 'Assumption',
        dataIndex: 'title',
        width: '50%',
        editable: true,
        fieldType:"TextField",
      },
      {
        title: 'Category',
        dataIndex: 'category',
        editable: true,
        fieldType:"ComboBox",
      },
      {
        title: 'Status',
        dataIndex: 'status',
        editable: true,
        fieldType:"ComboBox",
        render: (text,record) => (
          <span className="table-operation">
          {record.status === "Passed" &&  <Badge text={40} status="success" />}
          {record.status === "Failed" &&  <Badge status="warning" />}
          {record.status === "Processing" &&  <Badge count={5} status="processing" />}
          {record.status}
      
          </span>
        ),
      },

      {
        title: 'Actions',
        dataIndex: 'operation',
        key: 'operation',
        render: (text,record) => (
          <span className="table-operation">      
       
          <AssumptionStatus 
          record={record} 
          result={record.result} 
          onSave={() => this.setState({visiblePopoverRecId:null})} 
          open={this.state.visiblePopoverRecId}>

          </AssumptionStatus>
       
  
          <Popconfirm title="Update Result ?" onConfirm={() => this.setState({visiblePopoverRecId:record.id})}>
          <Icon  style={{margin:5}} type="check" />
       </Popconfirm>
           <Popconfirm title="Delete Assumption?" onConfirm={() => this.props.deleteAssumption(record)}>
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
      { title: 'Title', 
      width: '60%', 
      editable: true, 
      dataIndex: 'title', 
      key: 'title',
      editable:true,
      fieldType:"TextField",
      
    },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status', 
        editable: true, 
        fieldType:"ComboBox",
        render: (text, record) => (
          <span>
            <Badge status="success" />
            {record.status}
          </span>
        ),
      },

      {
        title: 'Actions',
        dataIndex: 'operation',
        key: 'operation',
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
          fieldType:col.fieldType,
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
          fieldType:col.fieldType,
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