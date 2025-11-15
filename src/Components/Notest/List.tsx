import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import { AuthContext} from '../../context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

export default function List() {
  const [noteList, setNoteList] = useState<any>(); 
  //filtered notes state  
  //pagnation start
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 10; // Number of items to display per page
  //pagnation end
  const [deleteData, setDeleteList] = useState<boolean>(false);
  const [editNoteData, setEditNoteData] = useState<boolean>(false);
  const authContextRes: any = useContext(AuthContext);
  const { getAllNotes, deleteNote, updateNote } = authContextRes;
  //console.log("noteList", noteList);
  const [formData, setFormData] = useState({
    _id:'',
    title: '',
    description: '',
    tag: '',
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  // Search function  

  const notify = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  const getNoteList = async () => {
    const response = await getAllNotes();
    setNoteList(response?.objectList.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setFilteredNotes(response?.objectList.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  
  }
  const handalDelete = async (id: string) => {
    const responce = await deleteNote({ _id: id });    
    if (responce?.finalResult?.deletedCount === 1) {
      setDeleteList(!deleteData);
      notify('The Data has been deleted successfully!', "success");
    } else {
      notify('Some thing went Wrong!', "error");
    }
    getNoteList();
  }
  const handaledit = async (value: any) => {    
    setEditNoteData(true);
    setFormData({
      _id: value._id,
      title: value.title,
      description: value.description,
      tag: value.tag,
    })
    getNoteList();
  }
  const updateFormData = async(e: FormEvent<HTMLFormElement>) =>{
    
        e.preventDefault();
        const responceUpdate  = await updateNote(formData);
        //console.log(responceUpdate?.Status);
        if(responceUpdate?.Status === 200)
        { 
          setEditNoteData(false);
          notify('The Data has been successfully Updated !', "success");
            getNoteList();
        } 
        getNoteList();
       
  }
  useEffect(() => {
    getNoteList();
  }, [])

  //pagenation start
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = noteList?.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil((noteList?.length || 0) / notesPerPage);
  //pagenation end
  return (
    <div className="relative">
      {/* edit start */}
      {editNoteData && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
            <form>
            <input type="hidden"  onChange={handleChange}  value={formData._id}/>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Title"
            />
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Description"
            />
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
              placeholder="Tag"
            />
            <div className="flex justify-between">
              <button className=" buttoncolor bg-black-500 text-white px-4 py-2 rounded hover:bg-black-600" onClick={() => setEditNoteData(false)}
              >Close</button>
              <button type="submit" onClick={updateFormData}
                className=" buttoncolor bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save Changes</button>
                </div>
                </form>
                
            </div>
          </div>
         
      )}
      {/* edit end */}
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Data Table</h2>
        <Toaster
          toastOptions={{
            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#713200',
            },
          }} />
   

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Tag</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentNotes?.map((item: any, index: number) => {
                return (
                  <tr key={item._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{index + 1 + (currentPage - 1) * notesPerPage}</td>
                    <td className="p-3">{item.title}</td>
                    <td className="p-3">{item.description}</td>
                    <td className="p-3">{item.tag}</td>
                    <td className="p-3 text-center">
                      <button type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => handalDelete(item._id)}>DELETE </button>

                      <button type="button"
                        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700
            hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300
             dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg 
             dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center
              me-2 mb-2" onClick={() => handaledit(item)}>EDIT</button>

                    </td>
                  </tr>
                )
              })
              }
            </tbody>
          </table>
        </div> 
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button  key={pageNumber} onClick={() => setCurrentPage(pageNumber)}
            className={`px-3 py-1 rounded ${ currentPage === pageNumber ? "bg-blue-500 text-balck" : "bg-read-200 #d81313ff"
            }`}>{pageNumber}</button>
            ))}
          </div> 
      </div>
    </div>
  )}
