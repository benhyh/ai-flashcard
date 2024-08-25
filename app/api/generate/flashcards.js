'use client'

import { useState } from 'react'
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
} from '@mui/material'

export const Generate = () => {
    const [text, setText] = useState('');
    const [flashcards, setFlashcards] = useState([]);

    const handleSubmit = async () => {
        if (!text.trim()) {
            alert('Please enter some text to generate flashcards.')
            return;
        }

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                body: text,
            })

            if (!response.ok) {
                throw new Error('Failed to generate flashcards')
            }

            const data = await response.json()
            setFlashcards(data)
        } catch (error) {
            console.error('Error generating flashcards:', error)
            alert('An error occurred while generating flashcards. Please try again.')
        }
    }

    return (
        <Container>
            {flashcards.map((val, id) => (
                <Container>

                </Container>
            ))}
        </Container>
    );
}