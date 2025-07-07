import LoadingState from "@/components/Global/LoadingState";

function BlogPostClientLoading(){
    //this loads while the server is fetching data and cannot load the components yet
    return <LoadingState />
}

export default BlogPostClientLoading;