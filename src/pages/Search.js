import React, {useState} from 'react';
import { useEffect } from 'react';
import firebase from '../firebase'
import {Flex, Spinner, Text, Input, Select} from '@chakra-ui/react'
import Thought from '../components/Thought';

function Search() {

    const [thoughts, setThoughts] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const ref = firebase.firestore().collection('thoughts')

    function getThoughts() {
        setLoading(true)
        ref.get().then((item) => {
            const items = item.docs.map((doc) => doc.data())
            setThoughts(items)
            setLoading(false)
        })
    }
    
    useEffect(() => {
        getThoughts()
    }, [])
    
    if (loading) {
        return (
            <Flex h='100vh' w='100vw' justifyContent='center' alignItems='center'>
                <Spinner/>
            </Flex>
        )
    }
    
    return (
        <Flex
            bg={"#F9FAFB"}
            direction='column'
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
        <Text fontSize='5xl' marginBottom='20px'>Posts</Text>
        <Flex w='70%' marginBottom={10}>
            <Input placeholder="Search Tags" backgroundColor='gray.300' size='lg' flex='2' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
        </Flex>
        {thoughts.filter((val) => {
            if (searchTerm == "") {
                return val
            } else if (val.tag.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val
            }
        }).map((thought) => (
            <Thought content={thought.content} timestamp={thought.timestamp} tag={thought.tag} key={thought.id} id={thought.id} uid={thought.uid}/>
        ))}
        </Flex>
    )
}

export default Search
