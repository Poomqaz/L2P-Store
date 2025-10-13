'use client'
import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
    id?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    title?: string
    children: React.ReactNode
    onClose: () => void
}

const Modal = ({ id, size = 'md', title, children, onClose }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEscape)
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl'
    }

    const modalContent = (
        <div className="modal fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div
                ref={modalRef}
                id={id}
                className={`${sizeClasses[size]} modal-container bg-white rounded-lg shadow-lg p-4`}
            >
                <div className="modal-header flex justify-between items-center mb-4">
                    <h3 className="modal-title text-xl font-semibold">{title}</h3>
                    <button onClick={onClose} className="modal-close text-gray-500 hover:text-gray-700">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )

    if (mounted && typeof window !== 'undefined') {
        return ReactDOM.createPortal(modalContent, document.body)
    }

    return null
}

export default Modal
