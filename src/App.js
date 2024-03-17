//npm install antd --save
import './App.css';
import {Table, Tag} from 'antd';
import { useState } from 'react';


// function App() {

//   const [loading, setLoading] = useState(false)
//   const [dataSource, setDataSource] = useState([]);
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
  
  
//   useEffect(() => {
//     setLoading(true);
//     fetch('https://jsonplaceholder.typicode.com/todos')
//     .then(Response=>Response.json())
//     .then(data=>{
//       setDataSource(data);
//     }).catch(err=>{
//       console.log(err);
//     }).finally(() => {
//         setLoading(false);
//     })
//   }, [])

//   const columns = [
//     {
//       key: "1",
//       title: "ID",
//       dataIndex: "id"
//     },
//     {
//       key: "2",
//       title: "USER ID",
//       dataIndex: "userId",
//       sorter:(record1, record2)=>{
//         return record1.userId - record2.userId
//       }
//     },
//     {
//       key: "3",
//       title: "Status",
//       dataIndex: "completed",
//       render: (completed)=>{
//         return <p>{completed? 'Completed':'In Progress'}</p>
//       },
//       filters:[
//         {text: 'Complete', value:true},
//         {text: 'In Progress', value:false}
//       ],
//       onFilter: (value, record) => {
//         return record.completed === value
//       }
//     },
//   ]

//   return (
//     <div className="App">
//       <header className="App-header">
//         <Table
//         loading={loading}
//         columns={columns}
//         dataSource={dataSource}
//         pagination={{                 //pagination={true}
//           current:page,
//           pageSize:pageSize,
//           total:500,
//           onChange:(page, pageSize)=>{
//             setPage(page);
//             setPageSize(pageSize)
//           }
//         }}     
//         >

//         </Table>
        
//       </header>
//     </div>
//   );
// }

// export default App;





//TABLE 2
//
function App() {

  const [alreadySelectedRows, setAlreadySelectedRows] = useState([]);
  

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'id'
    },
    {
      title: 'Student Name',
      dataIndex: 'name'
    },
    {
      title: 'Student Grade',
      dataIndex: 'grade',
      render:(tag) => {
        const color = tag.includes('A')?'Green':tag.includes('B')?'blue':'red'
        return <Tag color={color} key={tag}>{tag}</Tag>
      }
    }
  ]

  const dataSource = [
    {
      key: '1',
      id: 1,
      name: 'Student Name 1',
      grade: 'A+'
    },
    {
      key: '2',
      id: 2,
      name: 'Student Name 2',
      grade: 'A'
    },
    {
      key: '3',
      id: 3,
      name: 'Student Name 3',
      grade: 'B'
    },
    {
      key: '4',
      id: 4,
      name: 'Student Name 4',
      grade: 'C'
    },
    {
      key: '15',
      id: 5,
      name: 'Student Name 5',
      grade: 'A'
    }
  ]


  return (
    <div className="App">
      <header className="App-header">
        <Table
          columns={columns}
          dataSource={dataSource}
          rowSelection={{
            type:'checkbox',
            selectedRowKeys: alreadySelectedRows,
            onChange:(keys)=>{
              setAlreadySelectedRows(keys);
            },
            onSelect:(record)=>{
              console.log({record});
            },
            getCheckboxProps:(record)=>({
              disabled: record.grade === 'C'     //if remone it, can select 'C' again
            }),
            //hideSelectAll: true
            selections:[
              Table.SELECTION_NONE,
              Table.SELECTION_ALL,
              Table.SELECTION_INVERT,
              {
                key: 'even',
                text: 'Select Even Rows',
                onSelect:(allKeys)=>{
                  const selectedKeys = allKeys.filter(key=>{
                    return key %2 === 0
                  })
                  setAlreadySelectedRows(selectedKeys)
                }
              },
              {
                key: 'excellent',
                text: 'Select Student with Excellent Grads',
                onSelect:(allKeys)=>{
                  const selectedKeys = allKeys.filter(key=>{
                    const isExcellent = dataSource.find(student=>{
                      return student.key === key && student.grade.includes('A')
                    })
                    return isExcellent;
                  })
                  setAlreadySelectedRows(selectedKeys)
                }
              }
            ]
          }}
        >

        </Table>
        
      </header>
    </div>
  );
}

export default App;
