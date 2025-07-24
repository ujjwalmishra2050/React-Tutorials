import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import {Button , Input , Select , RTE} from '../indes'
import appwriteService from '../../Appwrite/config'
import { useSelector } from 'react-redux'
import { data, useNavigate } from 'react-router-dom'
function PostForm({post}) {
    const {register , handleSubmit , watch , setValue , control , getValues} = useForm({
        defaultValues :{
            title :post?.title || '',
            slug:post?.slug || '',
            content: post?.content || '',
            status : post?.status || 'active',
        },
        })
const Navigate = useNavigate()
const userdata = useSelector(state =>state.user.userData)

const submit = async (data) =>{
if (post) {
   const file = data.image[0] ? appwriteService.UploadFiles(data.image[0]) :null

   if (file) {
    appwriteService.DeleteFile(post.featuredimage)
   }
   const dbPost = await appwriteService.updatePost(post.$id ,{
    ...data,
    featuredimage : file ?file.id : undefined ,

   
   }  
)
 if (dbPost) {
    Navigate(`/post${dbPost.id}`)
    }
}else {
const file = await appwriteService.UploadFiles(data.image[0])

if (file) {
   const fileid = file.$id
   data.featuredimage = fileid
 const dbPost =  await appwriteService.createPost({
    ...data,
    userId :userData.$id
   })
   if (dbPost) {
    Navigate(`/post ${dbPost.$id}`)
   }
}
}
}

const SlugTransform = useCallback((value)=>{
    if (value && typeof value ==='string') 
        return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g,'-')
        .replace(/\s/g , '-')

        return ''
    
})
React.useEffect(()=>{
const subscription = watch((value , {name})=>{
    if (name ==='title') {
       setValue('slug' ,SlugTransform(value.title , {shouldValidate : true})) 
    }
})
    return ()=>{
        subscription.unsubscribe()
    }
       
},[watch,SlugTransform , setValue])
  return (
    <div>PostForm</div>
  )
}

export default PostForm