import { Button } from "@/components/ui/button";


interface Props {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const DataPagination = ({
    page,
    totalPages,
    onPageChange,
}: Props) => {
    return (
        <div className="flex items-center justify-between w-full px-2">
            <div className="flex-1 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                Matrix Frame <span className="text-white mx-1">{page}</span> / <span className="text-zinc-600 ml-1">{totalPages || 1}</span>
            </div>
            <div className="flex items-center justify-end space-x-3">
                <Button
                    disabled={page === 1}
                    size="sm"
                    onClick={() => onPageChange(Math.max(1, page - 1))}
                    className="bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] text-zinc-400 hover:text-white rounded-xl px-5 h-10 transition-all disabled:opacity-20"
                >
                    <span className="text-[10px] font-bold uppercase tracking-widest">Previous</span>
                </Button>
                <Button
                    disabled={page === totalPages || totalPages === 0}
                    size="sm"
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                    className="bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] text-zinc-400 hover:text-white rounded-xl px-5 h-10 transition-all disabled:opacity-20"
                >
                    <span className="text-[10px] font-bold uppercase tracking-widest">Next</span>
                </Button>
            </div>
        </div>
    )
}