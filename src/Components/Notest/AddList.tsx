import {ChangeEvent, useEffect,useState, useContext, FormEvent, HtmlHTMLAttributes} from 'react'
import CustomInput from '../../common/CustomInput';
import { AuthContext, AuthProvider } from '../../context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

export default function AddList() {
const tags = ["Technology", "Health", "Education", "Finance", "Entertainment"];  
const authContextRes: any =useContext(AuthContext);
const {addNote} = authContextRes;
const [formData, setFormData]= useState({
      title:'',
      description:'',
      tag:'',
    });
    const notify = (message: string, type: "success" | "error") => {
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      }
    };
const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
   setFormData({...formData, [e.target.name]: e.target.value});

} 
const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  try{    
   const response = await addNote(formData);
   if(response?.Status === 201){ 
    notify('The data has been submitted successfully!',"success");
    setFormData({
      title: '',
      description: '',
      tag: '',
  });
   }else{
    notify('something went wrong', "error")
   }
   } catch (error) { console.log(error); }

}

  return (
    <div>
       <div>
     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
  <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full">
    <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Add Notes</h2>
    <Toaster 
            toastOptions={{
            style: {
                border: '1px solidrgb(29, 208, 97)',
                padding: '16px',
                color: '#713200',
                },
        }} />

    <form onSubmit={handleSubmit}>
      {/* Note Title */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Title</label>
        <input 
          type="text" name='title' placeholder="title" value={formData.title} onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"/>
      </div>
      <div className="mb-4">
      <label className="block text-gray-700 font-medium">Tag</label>
      <select name="tag" value={formData.tag} onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 
      focus:outline-none focus:ring-2 focus:ring-blue-500 transition 
      duration-300">
            <option value="">Select a tag</option>
            {tags.map((tag) => (
              <option key={tag} value={tag.toLowerCase()}>{tag}</option>
            ))}
      </select>
      </div>


      {/* Note Description */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Description</label>
        <textarea  name="description" type="Descriptions" value={formData.description} onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" 
          placeholder="Enter note description"
        ></textarea>
      </div>
      {/* Priority */}
        
      <div className="flex justify-center items-center">
          <button type="submit" className="text-white bg-gradient-to-r
          from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4
            focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800
            font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
      </div>
    </form>
  </div>
</div>
 
    </div>
    </div>
  )
}
