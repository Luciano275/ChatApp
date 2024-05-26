'use client'

import BackButton from "@/components/BackButton";
import { Spinner } from "@/components/Loading";
import { useGlobalMessage } from "@/components/providers/global-message-provider";
import { NewVerificationAction } from "@/lib/new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function NewVerification() {
    
    const { setMessage } = useGlobalMessage()

    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            return;
        }

        NewVerificationAction(token)
            .then((rs) => {
                
                if (rs.error) {
                    setSuccess(null)
                    setError(rs.error!);
                    //setMessage(rs.error!, 'error');
                    return;
                }

                setError(null);
                setSuccess(rs.success!);
                //setMessage('Your email was verified', 'success');

            })
                .catch((err) => {
                    console.error(err);
                    setMessage('Something went wrong', 'error')
                })

    }, [token, success, error])

    useEffect(() => {

        onSubmit()
        
    }, [onSubmit]);

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-gray-100">
                { success && <>{success}</> }
                { error && <>{error}</>}
                { !success && !error && <><span className="text-blue-400">Verifiying</span> your email</> }
            </h1>
            <div className="flex justify-center items-center pt-5">
                {!success && !error && <Spinner width={50} height={50} />}
                {success && <p className="text-green-500">{<FaCheckCircle size={52} />}</p>}
            </div>
            <BackButton />
        </div>
    )
}