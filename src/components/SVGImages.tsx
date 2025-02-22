import react from 'react'
import React from "react"
import { COLORS } from '../theme'


const SVGImage: React.FC<any> = ({ width = 200, height = 200, fill = COLORS.new, Image }: { width?: number, height?: number, fill?: string, Image: any }) => {
    return <Image width={width} height={height} fill={fill} />
}
export default SVGImage